export interface User{
    _id:string;
    username:string;
    email:string;
    password?:string;
    profilePicture?:string;
    bio?:string;
    followers:string[];
    following:string[];
    posts:Post[];
    savedPost:string[] | Post[];
    isVerified:boolean;
}

export interface Post{
    _id:string;
    option:string;
    image?:{
        url:string;
        publicId:string;
    };
    user:User | undefined;
    likes:string[];
    comments:Comment[];
    createdAt:string;
}

export interface Comment{
    _id:string;
    text:string;
    user:{
        _id:string,
        username:string,
        profilePicture:string,
    };
    createdAt:string;

}

