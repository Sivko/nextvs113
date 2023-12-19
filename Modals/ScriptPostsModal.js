
import serverlessMysql from 'serverless-mysql'
import dbconfig from '@/dbconfig';

export async function getScriptPosts() {
  try {
    const mysql = serverlessMysql();
    mysql.config(dbconfig)
    await mysql.connect()
    let results = await mysql.query('SELECT * FROM script_posts LIMIT 20')
    await mysql.end()
    return results;
  } catch (err) {
    console.error(err)
    return err;
  }
}
