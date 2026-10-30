import {AlertCircle,RefreshCw,Info} from 'lucide-react';
import {useStore} from '../context/Store';
export default function MenuNotice(){
  const {catalogMode,menuNotice,refresh,loading}=useStore();
  if(catalogMode!=='preview')return null;
  return <div className="container"><div className="menu-preview-notice" role="status">
    <Info size={22} aria-hidden="true"/>
    <div><strong>Preview menu — 18 sample dishes</strong><p>{menuNotice}</p><small>Photos and prices are illustrative. Live cart checkout will be enabled after you connect the API and seed the database.</small></div>
    <button type="button" onClick={refresh} disabled={loading}><RefreshCw size={16}/>{loading?'Checking…':'Retry API'}</button>
  </div></div>;
}
