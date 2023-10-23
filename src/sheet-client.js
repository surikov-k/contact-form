import {google} from "googleapis";
import {client_email, private_key} from './secrets.json' assert {type: 'json'};

export const SHEET_ID = '1S2XxOr8C2Ep1OR9TAYgti1PuPAW1z1JLEgqt3k4-uxk';

const client = new google.auth.JWT(
  client_email,null, private_key, ['https://www.googleapis.com/auth/spreadsheets']
)

const sheets = google.sheets({
  version: 'v4',
  auth: client
});

export default sheets;
