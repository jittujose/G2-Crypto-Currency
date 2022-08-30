import React, { useState, useRef, useEffect } from 'react';
// import TodoList from './TodoList';
// import { v4 as uuidv4 } from 'uuid';
import { ethers } from "ethers";
import Navibar from "./Navibar"
import Footer from './Footer';
import "./image/logo.png"



const LOCAL_STORAGE_KEY = 'todoApp.todos'
let provider, balance, G2balance = null;
const contractAddress = '0x7c05ebCea845509C639510544E85484080262f92';
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "purchaseToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "_totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pricePerToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeAdd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeDiv",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeMul",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeSub",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function App() {
  const [todos, setTodos] = useState([])
  
  const balanceRef = useRef()
  const toaddressRef = useRef()
  const amountRef = useRef()
  const buyRef = useRef()
  const [values, setValues] = useState({
    toAddress: "",
    amount:""
  });


  const [submitted, setSubmitted] =  useState (false);
  const [connected, setConnected] = useState(false);
  const [connectstatus, setconnectstatus] = useState(false);
  const [buystatus, setbuystatus] = useState(false);
  const [buyvalues, setBuyvalues] = useState({
    buyamount:"",
    cost:""
  });
  const [balanceamt, setBalance] = useState({
	balanceamt:""
  })
 // const trStatusRef = useRef()

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos) )
  }, [todos])

//   useEffect(() => {
//     connect();
//   },[])

  // useEffect(() => {
  //   transfer();
  // },[])

const handleBalance = (event) => {
	setBalance({...values, balanceamt: G2balance})
}

const handleaddress = (event) => {
  setValues({...values, toAddress:event.target.value})
}
const handleamount =( event ) => {
  setValues({...values, amount:event.target.value})
}

const handleBuy = (event) => {
  const cost= 0.2*event.target.value;
  setBuyvalues({...values,buyamount: event.target.value,cost:cost})
}

const connect = async () =>{

	setConnected(true);
  // A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()

let accounts = await provider.listAccounts();
balance = await provider.getBalance(accounts[0])
console.log("balance :",balance.toString());

let g2Contract = new ethers.Contract(contractAddress, contractABI, provider);
g2Contract = g2Contract.connect(signer);

console.log("Contract Name:", await g2Contract.name());   
console.log("Contract Symbol:", await g2Contract.symbol());
G2balance = await g2Contract.balanceOf(accounts[0]);
console.log("G2 balance:", ethers.utils.formatUnits(G2balance, 18));
balanceRef.current.value = ethers.utils.formatUnits(G2balance, 18).toString()
setConnected(false)
setconnectstatus(true)

//  const G2 = ethers.utils.parseUnits("5.0", 18);
//  let tx = g2Contract.transfer("0x57C944830f527A3722eeF4A9a83DAf34B41d21f8", G2);
//  console.log("Tx:", tx);
} 



const transfer = async (event) => {
  event.preventDefault();
  setSubmitted(true);
  setValues({...values, toAddress: event.target.value.toAddress, amount: event.target.value.amount})

  console.log("dgvkjhs",values);
    // A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()

let accounts = await provider.listAccounts();
balance = await provider.getBalance(accounts[0])
console.log("balance :",balance.toString());

let g2Contract = new ethers.Contract(contractAddress, contractABI, provider);
g2Contract = g2Contract.connect(signer);

console.log("Contract Name:", await g2Contract.name());   
console.log("Contract Symbol:", await g2Contract.symbol());
G2balance = await g2Contract.balanceOf(accounts[0]);
console.log("G2 balance:", ethers.utils.formatUnits(G2balance, 18));
//balanceRef.current.value = ethers.utils.formatUnits(G2balance, 18).toString()

// if ((ethers.utils.formatUnits(G2balance, 18))===0) return;

const amount = amountRef.current.value
const toAddress = toaddressRef.current.value
console.log("Amount : ",amount.toString())
console.log("to address :", toAddress)


const G2 = ethers.utils.parseUnits(amount.toString(), 18);
let tx = g2Contract.transfer(toAddress, G2);
console.log("Tx:", tx);
// if(tx) {
//   trStatusRef.current.value = "Transaction Successfull"
// } else {
//   trStatusRef.current.value = "Transaction failed"
// }


}

const buy = async (event) => {
  event.preventDefault();
  setbuystatus(true);
  console.log("dgvkjhs",values);
  // A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()

let accounts = await provider.listAccounts();
balance = await provider.getBalance(accounts[0])
console.log("balance :",balance.toString());

let g2Contract = new ethers.Contract(contractAddress, contractABI, provider);
g2Contract = g2Contract.connect(signer);

console.log("Contract Name:", await g2Contract.name());   
console.log("Contract Symbol:", await g2Contract.symbol());
G2balance = await g2Contract.balanceOf(accounts[0]);
console.log("G2 balance:", ethers.utils.formatUnits(G2balance, 18));
//balanceRef.current.value = ethers.utils.formatUnits(G2balance, 18).toString()

// if ((ethers.utils.formatUnits(G2balance, 18))===0) return;

const amount = buyRef.current.value
const toAddress = toaddressRef.current.value

console.log("Amount : ",amount.toString())
console.log("to address :", toAddress)
console.log("jghkifdz", buyvalues.cost)


const G2 = ethers.utils.parseUnits(amount.toString(), 18);
let tx = g2Contract.purchaseToken(G2,{ value: ethers.utils.parseEther(buyvalues.cost.toString()) });
console.log("Tx:", tx);
// if(tx) {
//   trStatusRef.current.value = "Transaction Successfull"
// } else {
//   trStatusRef.current.value = "Transaction failed"
// }
}



  return (
    <> 



    {/* <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div><br></br> */}
	
	<Navibar />
	<a id="home"></a>
	<div class="has-bg-img position-relative">
	<img class="bg-img img-fluid" alt="Responsive image" src={require('./bgimg.jpg')}/>
	
	<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light justify-content-center"
	 >
	<a id="connect"></a>
	
    <div class="col-md-5 p-lg-5 mx-auto my-2 card">
	
		{connectstatus?null : <p class="text-danger">
		You must need MetaMask account and browser extention of MetaMask </p>}
		
		<button onClick={connect} onChange={handleBalance} class="btn btn-primary">Connect wallet</button> 
    <h3 class="mt-3">G2 Coin balance</h3> 
	<div class="d-flex justify-content-center"> 
	<input class="input-normal d-sm-flex btn-outline-secondary" width="20px" ref={balanceRef} type="text" readOnly/>
	</div>{connected ?  <div className='success-message'> Please waite few seconds to load the balance.</div> :null}
	{connectstatus ?  <div className='success-message'> <h5 class="text-success">Connected! </h5></div> :null}
	</div>
	</div>
	</div>

	<div class="bg-image position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light justify-content-center">
		
	<div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3 justify-content-center">
		<div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden" >
		<form>
			<legend><h3>Transfer G2 Coin</h3></legend>
			<div class="form-froup"><a id="transfer"></a>
       <label>To address &nbsp;</label>
       <input width="20%" type="text" value={values.toAddress} ref={toaddressRef} 
        onChange={handleaddress} required></input></div><br></br>
		<div class="form-froup">
       <label>Amount &emsp;&nbsp;</label>
       <input type="number" onChange={handleamount} value={values.amount} ref={amountRef} class="justfy-content-center" required></input></div>
        <br></br><div class="container">
			
	   <button onClick={transfer} class="btn-success">Transfer</button> </div>
       {submitted ?  <div className='success-message'> Confirm your transaction in your MetaMask wallet.</div> :null}
       </form>
       </div> </div>
     
     <br></br><br></br>
		<div class="card bg-#620a80 bg-gradient mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
     <form>
	 <a id="buy"></a>
      <h3>Buy G2 Coin</h3>
      <label>Enter number of G2 Coins&nbsp;</label>
      <input type="number" onChange={handleBuy} ref={buyRef} value={buyvalues.buyamount} required></input>
     <h4> Cost : {buyvalues.cost} Ether </h4>
     <button onClick={buy} class="btn-success"> Buy </button>
     </form>
	 {buystatus?<p className="success-message">Confirm transaction in MetaMak</p>:null}
	 </div>
	 
	 </div>
	 <Footer />
    </>
  );
}

export default App;
