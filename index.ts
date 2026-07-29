import express, {type Request, type Response} from 'express'

const app = express();
const port:number = 8080;

// interface UserParams {
//     userId: string
// }
//
// interface  UserQuery {
//     includePost?: string,
//     limit?: string
// }

// 2. Apply the generic: Request<Params, ResBody, ReqBody, ReqQuery>
// app.get('/user/:userId', (req: Request<UserParams, UserQuery >, res: Response)=> {
//     const userId = req.params.userId;
//
//     const limit = req.query.limit || 30;
//     const includePost = req.query.includePost;
//     res.send(`Fetching user ${userId}. Limit: ${limit}. Include Post: ${includePost}`)
// });

// 1. route parameters
// app.get('/user/:userId', (req: Request<UserParams>, res: Response)=> {
//     const userId = req.params.userId;
//     res.send(`You requested the user with ID: ${userId}`);
//     console.log(userId);
// })

interface User {
    id: number,
    name: string,
    gender: boolean
}

interface UserIdParam {
    id: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Dara",
        gender: true
    } ,
    {
        id: 2,
        name: "Sok",
        gender: false
    }
];

app.get('/users', (req: Request, res: Response) => {
    return res.json({
        status: true,
        message: 'User retrieved successfully.',
        data: users
    })
});

app.get('/users/:id', (req: Request<UserIdParam>, res: Response) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.json({
            status: false,
            message: 'User not found'
        })
    }
    return res.json({
        status: true,
        message: 'User retrieved successfully.',
        data: user
    })
});

app.listen(port,() => {
     console.log(`Server running on port: ${port}`);
});