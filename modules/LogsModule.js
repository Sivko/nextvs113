
import serverlessMysql from 'serverless-mysql'
import dbconfig from '@/dbconfig';

// export async function getLogs() {
//   try {
//     const mysql = serverlessMysql();
//     mysql.config(dbconfig)
//     await mysql.connect()
//     let results = await mysql.query('SELECT * FROM logs LIMIT 100')
//     await mysql.end()
//     return results;
//   } catch (err) {
//     console.error(err)
//     return err;
//   }
// }

export async function setLog({url_query = null, res_crm = null, res_code_crm = null, const_id = null, token = null, error = null, time = null, version, address = 'https://app.salesap.ru' }) {
  try {
    const mysql = serverlessMysql();
    mysql.config(dbconfig)
    await mysql.connect()
    let results = await mysql.query(`
      INSERT INTO logs (url_query, res_crm, res_code_crm, const_id, token, error, time, version)
      VALUES ('${url_query}', '${res_crm ? JSON.stringify(res_crm) : res_crm}', ${res_code_crm}, ${const_id}, '${token}', "${error}", ${time}, ${version}, ${address})
    `)
    await mysql.end()
    return results;
  } catch (err) {
    console.error(err)
    return err;
  }
}