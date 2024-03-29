import type { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from 'react';
import { saveToGoogleSheets }  from './google-sheets';
import { validateDomain } from '@/utils/domain-validator';

type Data = {
  error?: string;
  domain?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const domain = req.query.domain;
  try {
    // 验证域名是否合法
    if (!validateDomain(domain as string)) {
      throw new Error('Invalid domain');
    }
    // 处理域名
    const processedDomain = await processDomain(domain as string);

    // res.status(200).json({ domain: processedDomain });

    // 将数据存储到 Google Sheets
    await saveToGoogleSheets(processedDomain as string);
    if(req.method === 'POST') {
      res.status(200).json({ domain: processedDomain });
    }
    else {
      const punycode = require('punycode');
      // 重定向到处理后的域名
      res.redirect(`http://${punycode.toASCII(processedDomain)}`);
    }
  } catch (error) {
    console.error('Error processing domain:', error);
    res.status(500).json({ error: 'Invalid domain' });
  }
}
const isValidDomain = (domain: string) => {
  const domainRegex = /^((?!-)[A-Za-z0-9\+\-\*-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
  const sensitiveWords = ['xijinping', 'xjp', '习', '进', '平', '習']; // 替换为您的敏感词列表

  // 检查域名是否有效
  if (!domainRegex.test(domain)) {
    return false;
  }

  // 检查域名是否包含敏感词
  for (const word of sensitiveWords) {
    if (domain.includes(word)) {
      return false;
    }
  }

  return true;
};

const processDomain = (domain: string) => {
  const domainArr = domain.split('.');
  const domainExt = domainArr.pop();
  let result = '';
  for (let i = 0; i< domainArr.length; i++) {
    const part = domainArr[i];
    let isRepeat: boolean;
    (i === domainArr.length - 1) ? isRepeat = true : isRepeat = false;
    if (part.includes('+')) {
      const subParts = part.split('+');
      for (const subPart of subParts) {
        result += `${processSubPart(subPart, isRepeat)}`;
      }
    } else {
      result += `${processSubPart(part, isRepeat)}`;
    }
    result += '.';
  }
  let processedDomain = `${result}${domainExt}`;
  return processedDomain;
};


function processSubPart(subPart: string, isRepeat: boolean) {
  if (subPart.includes('*')) {
    const [char, count] = subPart.split('*');
    return char.repeat(parseInt(count));
  } else if (subPart.includes('-')) {
    const [start, end] = subPart.split('-');
    if (start.match(/[a-zA-Z]/)) {
      return getCharRange(start, end).join('');
    } else {
      return getNumRange(parseInt(start), parseInt(end)).join('');
    }
  } else {
    if(isRepeat) {
      return subPart.repeat(Math.ceil(63 / subPart.length)).slice(0, 63)
    } else {
      return subPart;
    }
  }
}

function getCharRange(start: string, end: string): string[] {
  const startCode = start.charCodeAt(0);
  const endCode = end.charCodeAt(0);
  const range: string[] = [];

  let increment = true;
  let i = startCode;
  startCode < endCode ? increment = true : increment = false;

  while(increment ? i <= endCode : i >= endCode) {
    range.push(String.fromCharCode(i));
    increment ? i++ : i--;
  }

  return range;
}

function getNumRange(startNum: number, endNum: number): number[] {
  const range: number[] = [];

  let increment = true;
  let i = startNum;
  startNum < endNum ? increment = true : increment = false;

  while(increment ? i <= endNum : i >= endNum) {
    range.push(i);
    increment ? i++ : i--;
  }

  return range;
}