
import serverlessMysql from 'serverless-mysql';
import dbconfig from '@/dbconfig';
import mysql_real_escape_string from '@/helpers/mysql_real_escape_string';

export async function getLogs({token}) {


  try {
    if (!token) return [];
    const mysql = serverlessMysql();
    mysql.config(dbconfig)
    await mysql.connect()
    let results = await mysql.query(`SELECT * FROM logs WHERE token="${token}" ORDER BY id DESC LIMIT 100`)
    await mysql.end()
    return results;
  } catch (err) {
    console.error(err)
    return err;
  }
}

export async function setLog({url_query = null, res_crm = null, res_code_crm = null, const_id = null, token = null, error = null, time = null, version, address = 'https://app.salesap.ru', data = null}) {
  try {
    const mysql = serverlessMysql();
    mysql.config(dbconfig)
    await mysql.connect()
    let results = await mysql.query(`
      INSERT INTO logs (url_query, res_crm, res_code_crm, const_id, token, error, time, version, address, data)
      VALUES ('${url_query}', '${mysql_real_escape_string(JSON.stringify(res_crm))}', ${res_code_crm}, ${const_id}, '${token}', "${error}", ${time}, ${version}, '${address}', '${mysql_real_escape_string(JSON.stringify(data))}')
    `)
    await mysql.end()
    return results;
  } catch (err) {
    console.error(err)
    return err;
  }
}