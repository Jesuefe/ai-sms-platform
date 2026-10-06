"use client";
import {useState} from "react";
export default function Home(){
 const [recipients,setRecipients]=useState(""); const [senderid,setSenderid]=useState("ZANA"); const [message,setMessage]=useState(""); const [gateway,setGateway]=useState("1"); const [loading,setLoading]=useState(false); const [result,setResult]=useState<unknown>(null);
 async function send(){setLoading(true);setResult(null);try{const r=await fetch("/api/test-sms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({recipients,senderid,message,gateway})});const d=await r.json();setResult(d)}catch(e){setResult({error:"Request failed"})}finally{setLoading(false)}}
 return <main><div className="card"><h1>AI SMS Platform</h1><p className="muted">Bulk-SMS.ng test console</p>
 <label>Recipients</label><textarea value={recipients} onChange={e=>setRecipients(e.target.value)} placeholder="2348012345678,2348098765432"/>
 <label>Sender ID</label><input value={senderid} onChange={e=>setSenderid(e.target.value)} placeholder="Your brand"/>
 <label>Message</label><textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Your test message"/>
 <label>SMS Gateway</label><input value={gateway} onChange={e=>setGateway(e.target.value)} placeholder="1"/>
 <button onClick={send} disabled={loading||!recipients||!message}>{loading?"Sending...":"Send test SMS"}</button>
 {result&&<pre>{JSON.stringify(result,null,2)}</pre>}
 <p className="note">Use only numbers you own or have permission to message. Provider acceptance is not the same as carrier delivery.</p>
 </div></main>
}