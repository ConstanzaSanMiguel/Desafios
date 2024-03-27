import CustomRouter from "./CustomRouter.js"
import ApiRouter from "./api/index.api.js"
import ViewsRouter from "./views/index.views.js"

const api = new ApiRouter() 
const apiRouter = api.getRouter() 
const views = new ViewsRouter()
const viewsRouter = views.getRouter()

class IndexRouter extends CustomRouter {
    init() {
        this.router.use("/api", apiRouter)
        this.router.use('/', viewsRouter)
    }
}

const router = new IndexRouter()
export default router.getRouter()