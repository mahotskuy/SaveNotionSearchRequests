const google = require('googleapis').google;
const googleCredentials = require('./google-credentials.js').default;

 export const addRecord = async function(searchText, spreadsheetId) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_id: googleCredentials.client_id,
            client_email: googleCredentials.client_email,
            private_key: googleCredentials.private_key.replace(/\\n/g,'\n')
        },
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();

    // const client = auth.fromJSON(keys);
    // client.scopes = ['https://www.googleapis.com/auth/cloud-platform'];
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

   return await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: `${metaData.data.sheets[0].properties.title}!A:B`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[searchText, (new Date()).toISOString()]],
        },
      });
}
