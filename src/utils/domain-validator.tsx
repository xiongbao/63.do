// domain-validator.ts
import fs from 'fs';
import path from 'path';

const domainSuffixes = new Set<string>();

// 从 domain-suffix.txt 文件中读取域名后缀
fs.readFileSync(path.join(process.cwd(), '/src/utils/domain-suffix.txt'), 'utf-8')
  .split('\n')
  .forEach((suffix) => {
    domainSuffixes.add(suffix.trim());
  });

// 验证域名是否符合规则
function isValidDomain(domain: string): boolean {
  const regex = /^((?!-)[A-Za-z0-9\+\-\*-]{1,63}(?<!-)\.)+[A-Za-z0-9-]{2,63}$/;
  return regex.test(domain);
}

// 校验域名后缀是否真实有效
function hasValidDomainSuffix(domain: string): boolean {
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  return domainSuffixes.has(tld.toUpperCase());
}

// 对 IDN 域名后缀进行转义处理
function escapeIDN(domain: string): string {
  const punycode = require('punycode');
  return punycode.toASCII(domain);
}

// 域名验证方法
export function validateDomain(domain: string): boolean {
  const sensitiveWords = ['xijinping', 'xjp', '习', '进', '平', '習']; // 替换为您的敏感词列表
  // 检查域名是否包含敏感词
  for (const word of sensitiveWords) {
    if (domain.includes(word)) {
      return false;
    }
  }
  const escapedDomain = escapeIDN(domain);

  if (!isValidDomain(escapedDomain)) {
    return false;
  }

  if (!hasValidDomainSuffix(escapedDomain)) {
    return false;
  }

  return true;
}