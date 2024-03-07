import getConfig from 'next/config';
import { google } from 'googleapis';

const { serverRuntimeConfig } = getConfig();
const sheets = google.sheets('v4');
const privateKey = serverRuntimeConfig.googlePrivateKey.replace(/\\n/g, "\n");
// 使用服务帐户凭据进行身份验证
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  projectId: serverRuntimeConfig.googleProjectId,
  credentials: {
    private_key: privateKey,
    client_email: serverRuntimeConfig.googleClientEmail,
  },
});
// 获取 Google Sheets 的 ID
const spreadsheetId = serverRuntimeConfig.googleSheetId;
// 获取要写入数据的工作表名称
const sheetName = 'Sheet1';

export async function saveToGoogleSheets(processedDomain: string): Promise<void> {
  const sheetData = await sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: spreadsheetId,
    range: sheetName,
  });

  // 检查域名是否已经存在
  const existingDomains = sheetData.data.values?.map((row) => row[0]);
  const index = existingDomains?.indexOf(processedDomain);

  if (index !== undefined && index >= 0) {
    // 更新现有行的 UV 和 UpdateTime
    const uv = parseInt((sheetData.data.values || [])[index][3]) + 1;
    const updateTime = new Date().toISOString();
    const updateRange = `Sheet1!C${index + 1}:D${index + 1}`; // 根据您的工作表名称和范围进行修改
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [updateTime, uv],
        ],
      },
      auth: auth,
    });
  } else {

    // 添加新行
    const newRow = [
      processedDomain,
      new Date().toISOString(),
      new Date().toISOString(),
      1,
    ];
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
      auth: auth,
    });
    console.log('Data appended to Google Sheets:', response.data);
  }
  return;
}
