import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import {
  configureChains,
  createClient,
  useAccount,
  useConnect,
  WagmiConfig,
} from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import { useWeb3ModalTheme } from "@web3modal/react";
import "./App.css";

const chains = [arbitrum, mainnet, polygon];
const projectId = "c35dde76be433065d85e96177986abd7";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  const { setTheme } = useWeb3ModalTheme();
  const navigate = useNavigate();
  const { address, isConnected, isDisconnected } = useAccount();

  useEffect(() => {
    setTheme({
      themeMode: "dark",
      themeVariables: {
        "--w3m-font-family": "Plus Jakarta Sans, sans-serif",
        "--w3m-accent-color": "#fffc12",
        "--w3m-accent-fill-color": "black",
      },
    });
  }, []);

  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <div className="main font-body">
          <Header className="component" />
          <Routes>
            <Route path="/" element={<LandingPage className="component" />} />
          </Routes>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;
