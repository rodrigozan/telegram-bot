import { App } from "./app"

const PORT = process.env.PORT || 4000;

export default new App().server.listen(PORT, () => console.log(`Server running on port ${PORT}`))