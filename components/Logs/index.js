import axios from "axios";
import { useEffect, useState } from "react"
import moment from 'moment';
import 'moment/locale/ru';

export default function Logs({ token }) {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    setIsLoading(true);
    const _data = await axios.get(`/api/logs?token=${token}`);
    setData(_data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [token]);

  const Loading = () => (<div className="w-full text-center p-6"><div className="inline-block w-14 h-14 border-t-2 border-t-main rounded-full animate-spin" /></div>);

  // if (!data.length) return (<h1>Ничего не найдено :(</h1>)

  return (<div>
    <table className="border-collapse table-fixed w-full text-sm rounded-t-2xl overflow-hidden">
      <thead className="bg-secondary">
        <tr>
          <th className="border-b font-medium p-4 text-white text-left">id</th>
          <th className="border-b font-medium p-4 text-white text-left">url_query</th>
          <th className="border-b font-medium p-4 text-white text-left">res_crm</th>
          <th className="border-b font-medium p-4 text-white text-left">res_code_crm</th>
          <th className="border-b font-medium p-4 text-white text-left">const_id</th>
          <th className="border-b font-medium p-4 text-white text-left">error</th>
          <th className="border-b font-medium p-4 text-white text-left">created_at</th>
          <th className="border-b font-medium p-4 text-white text-left">time</th>
          <th className="border-b font-medium p-4 text-white text-left">version</th>
          <th className="border-b font-medium p-4 text-white text-left">data</th>
        </tr>
      </thead>
      {!isLoading && (<tbody className="bg-white dark:bg-slate-800">
        {!!data.length && data.map(e => (
          <tr key={e.id}>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.id}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.url_query}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.res_crm}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.res_code_crm}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.const_id}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.error}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {moment(e.created_at).format('DD.MM.YYYY hh:mm:ss')}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.time}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.version}
            </td>
            <td className="border-b max-w-full text-ellipsis overflow-hidden border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              {e.data}
            </td>
          </tr>
        ))}
      </tbody>)}
    </table>
    {isLoading && <Loading />}
    {!isLoading && !data.length && <h1>Ничего не найдено <span onClick={loadData} className="p-6 border-none text-main text-base cursor-pointer">обновить</span></h1>}
  </div>)
}