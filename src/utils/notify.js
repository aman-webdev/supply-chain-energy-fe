import {  toast } from 'react-toastify';

const notify=(msg)=>toast(msg,{
    progressClassName: "bg-[#fffc12]",
})
export default notify