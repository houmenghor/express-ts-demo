import express, { Request, Response } from 'express'

const app = express();
app.use(express.json()); //convert from json obj to javascript obj
const port:number = 8080;

interface User {
    id: number,
    name: string,
    gender: boolean,
    phone: string
}

interface UserIdParam {
    id: string;
}

// array object to store users
const users: User[] = [
    // {
    //     id: 1,
    //     name: "Dara",
    //     gender: true
    // } ,
    // {
    //     id: 2,
    //     name: "Sok",
    //     gender: false
    // }
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
        return res.status(404).json({
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

interface CreateUserBody {
    id: number,
    name: string,
    gender: boolean,
    phone: string
}

interface SuccessResponse {
    status: boolean,
    message: string,
    data: User
}

let userId:number = 0;
app.post('/users', (req: Request<{}, any, CreateUserBody>, res: Response<SuccessResponse>) => {
    userId++;
    const newUser: User = {
        id: userId,
        name: req.body.name,
        gender: req.body.gender,
        phone: req.body.phone
    }

    users.push(newUser);
    return res.status(201).json({
        status: true,
        message: 'Successfully created',
        data: newUser
    })
});

app.put('/users/:id', (req: Request<UserIdParam, any, CreateUserBody>, res: Response)=> {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    // console.log(user);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'User not found'
        });
    }

    user.name = req.body.name;
    user.gender = req.body.gender;
    user.phone = req.body.phone;

    return res.json({
        status: true,
        message: "User updated successfully!"
    });
});

app.delete('/users/:id', (req: Request<UserIdParam, any>, res: Response) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    // console.log(user);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'User not found'
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.json({
        status: true,
        message: 'Successfully deleted',
    })
});


app.listen(port,() => {
     console.log(`Server running on: http://localhost:${port}`);
});