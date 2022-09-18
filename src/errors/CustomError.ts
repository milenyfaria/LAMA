export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "The name must be longer than 3 characters")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Insert a valid email")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Email must be longer than 6 characters")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "User not found")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Unauthorized user")
    }
} 

export class InvalidTime extends CustomError {
    constructor() {
        super(401, 'Invalid Time')
    }
}

export class InvalidDay extends CustomError {
    constructor() {
        super(401, 'Invalid Day')
    }
}

export class InvalidBand extends CustomError {
    constructor() {
        super(404, "Has no bands")
    }
}

export class InvalidShow extends CustomError {
    constructor() {
        super(401, "There's a show at this moment")
    }
}

