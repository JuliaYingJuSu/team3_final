import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap.bundle.min")
  },[])
  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  }, [])
  return <Component {...pageProps} />
}
