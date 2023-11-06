import { Toaster } from "sonner"
import Gallery from "./components/Gallery"
import './styles/App.css'
const App = () => <>
    <Toaster position="bottom-center" duration={2000} />
    <Gallery />
</>

export default App
