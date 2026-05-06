const { google } = require('googleapis');
require('dotenv').config();

/**
 * @class
 * @classdesc ModuleDatabase is a class that reads data from a Google Sheet.
 * The data is then used to create ModuleData objects, which are used to create
 * Discord embeds.
 * 
 */
class ModuleDatabase {
  constructor() {
    this.Scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    this.ApplicationName = 'Arcane-magica';
  }
/**
 *
 * @async
 * @method init
 * @description This method reads data from a Google Sheet and creates ModuleData objects.  
 * @returns {Promise<ModuleData[]>}
 * 
 */

async initAliasTriggers() {
  const auth = await this.authorize();

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.SHEET_ID;
  const range = 'Proposed Triggers!A2:B';
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const AliasTriggersValues = result.data.values || [];
  const AliasTriggersresultData = [];
  for(const row of AliasTriggersValues){
    const data = new ModuleData();
    for (let i = 0; i < row.length; i++) {
      if (i === 0) {
        data.Triggers = row[i].split(',');
      }
      if (i === 1) {
        data.Command = row[i];
      }
      
    }
    AliasTriggersresultData.push(data);
  }
  return AliasTriggersresultData;
}
async initHelp() {
  const auth = await this.authorize();

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = process.env.SHEET_ID;
  const range = 'Help Module Data!A2:AK';
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const HelpModuleValues = result.data.values || [];
  const HelpresultData = [];
  for(const row of HelpModuleValues){
    const data = new ModuleData();

    for (let i = 0; i < row.length; i++) {
      if (i === 0) {
        data.Trigger = row[i];
      }
      if (i === 1) {
        data.Title = row[i];
      } 
      if(i === 2){
        data.Footer = row[i];
      }
      if(i === 3){
        data.Field_1_Name = row[i];
      }
      if(i === 4){
        data.Field_1_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 5){
        data.Field_2_Name = row[i];
      }
      if(i === 6){
        data.Field_2_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 7){
        data.Field_3_Name = row[i];
      }
      if(i === 8){
        data.Field_3_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 9){
        data.Field_4_Name = row[i];
      }
      if(i === 10){
        data.Field_4_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 11){
        data.Field_5_Name = row[i];
      }
      if(i === 12){
        data.Field_5_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 13){
        data.Field_6_Name = row[i];
      }
      if(i === 14){
        data.Field_6_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 15){
        data.Field_7_Name = row[i];
      }
      if(i === 16){
        data.Field_7_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 17){
        data.Field_8_Name = row[i];
      }
      if(i === 18){
        data.Field_8_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 19){
        data.Field_9_Name = row[i];
      }
      if(i === 20){
        data.Field_9_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 21){
        data.Field_10_Name = row[i];
      }
      if(i === 22){
        data.Field_10_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 23){
        data.Field_11_Name = row[i];
      }
      if(i === 24){
        data.Field_11_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 25){
        data.Field_12_Name = row[i];
      }
      if(i === 26){
        data.Field_12_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 27){
        data.Field_13_Name = row[i];
      }
      if(i === 28){
        data.Field_13_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 29){
        data.Field_14_Name = row[i];
      }
      if(i === 30){
        data.Field_14_Data = this.parseSpecialChars(row[i]);
      }
      if(i === 31){
        data.Field_15_Name = row[i];
      }
      if(i === 32){
        data.Field_15_Data = this.parseSpecialChars(row[i]);
      }
      
    }
    HelpresultData.push(data);
  }
  return HelpresultData;
}
  async init() {
    const auth = await this.authorize();

    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = '1dBAK8qQVdQBJjpGIZT_gDHKYF3dNb0ng6aNkhEbhfTY';
    const range = 'Data!A2:AG';
    const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const values = result.data.values || [];
    
    const resultData = [];
 
    for (const row of values) {
      
      const data = new ModuleData();
      for (let i = 0; i < row.length; i++) {

       
        if (i === 0) {
          data.Trigger = row[i];
        }
        if (i === 2) {
          data.Title = row[i];
        }
        if(i === 3){
          data.Image_URL = row[i];
        }
        if(i === 4){//discription
          data.Discription = row[i];
        }
        if (i === 5) {
          data.Footer = row[i];
        }
        if (i === 6) {
          data.Field_1_Name = row[i];
        }
        if (i === 7) {
          data.Field_1_Data = this.parseSpecialChars(row[i]);

        }
        if (i === 8) {
          data.Field_2_Name = row[i];
        }
        if (i === 9) {
          data.Field_2_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 10) {
          data.Field_3_Name = row[i];
        }
        if (i === 11) {
          data.Field_3_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 12) {
          data.Field_4_Name = row[i];
        }
        if (i === 13) {
          data.Field_4_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 14) {
          data.Field_5_Name = row[i];
        }
        if (i === 15) {
          data.Field_5_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 16) {
          data.Field_6_Name = row[i];
        }
        if (i === 17) {
          data.Field_6_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 18) {
          data.Field_7_Name = row[i];
        }
        if (i === 19) {
          data.Field_7_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 20) {
          data.Field_8_Name = row[i];
        }
        if (i === 21) {
          data.Field_8_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 22) {
          data.Field_9_Name = row[i];
        }
        if (i === 23) {
          data.Field_9_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 24) {
          data.Field_10_Name = row[i];
        }
        if (i === 25) {
          data.Field_10_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 26) {
          data.Field_11_Name = row[i];
        }
        if (i === 27) {
          data.Field_11_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 28) {
          data.Field_12_Name = row[i];
        }
        if (i === 29) {
          data.Field_12_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 30) {
          data.Field_13_Name = row[i];
        }
        if (i === 31) {
          data.Field_13_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 32) {
          data.Field_14_Name = row[i];
        }
        if (i === 33) {
          data.Field_14_Data = this.parseSpecialChars(row[i]);
        }
        if (i === 34) {
          data.Field_15_Name = row[i];
        }
        if (i === 35) {
          data.Field_15_Data = this.parseSpecialChars(row[i]);
        }

        





        
      }
      resultData.push(data);
    }

    return resultData;
  }
/**
 * 
 * @async
 * @method authorize
 * @description This method authorizes the Google Sheets API.
 * @returns {Promise<google.auth.OAuth2>}
 * 
 */
async authorize() {
  const auth = new google.auth.GoogleAuth({
    credentials: require('./credentials.json'),
    scopes: this.Scopes,
  });

  const client = await auth.getClient();
  const token = await auth.getAccessToken();

  return client;
}


  parseSpecialChars(value) {
    if (typeof value === 'string') {
      return value.replace(/\\n/g, '\n');
    }
    return value;
  }

/**
 * @class
 * @classdesc ModuleData is a class that represents the data for a single module.
 * 
 */
}
class AliasData{
 constructor(){
    this.Triggers = [];
    this.Command = '';
   
  }

}
class ModuleData {
  constructor() {
    this.Trigger = '';
    this.Title = '';
    this.Footer = '';
    this.Field_1_Name = '';
    this.Field_1_Data = '';
    this.Field_2_Name = '';
    this.Field_2_Data = '';
    this.Field_3_Name = '';
    this.Field_3_Data = '';
    this.Field_4_Name = '';
    this.Field_4_Data = '';
    this.Field_5_Name = '';
    this.Field_5_Data = '';
    this.Field_6_Name = '';
    this.Field_6_Data = '';
    this.Field_7_Name = '';
    this.Field_7_Data = '';
    this.Field_8_Name = '';
    this.Field_8_Data = '';
    this.Field_9_Name = '';
    this.Field_9_Data = '';
    this.Field_10_Name = '';
    this.Field_10_Data = '';
    this.Field_11_Name = '';
    this.Field_11_Data = '';
    this.Field_12_Name = '';
    this.Field_12_Data = '';
    this.Field_13_Name = '';
    this.Field_13_Data = '';
    this.Field_14_Name = '';
    this.Field_14_Data = '';
    this.Field_15_Name = '';
    this.Field_15_Data = '';
  }

  toString() {
    return this.Trigger;
  }
}

module.exports = ModuleDatabase
  
