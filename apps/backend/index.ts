import express from "express";
import {prisma} from "./db";
import z, { uuidv4 }  from "zod";
import { CreateUserSchema } from "./types";
import { CreateAvatarSchema } from "./types";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import axios from "axios";
import { createImage } from "./image";
import {uuid} from "uuidv4";
import { generateVideo } from "./video";
const app = express();


app.use(express.json());


//SIGNUP

app.post("/api/v1/signup",async (req, res)=>{
    const{success,data} = CreateUserSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Incorrect credentials"
        })
        return;
    }
   const user= await prisma.user.create({
    data:{
         username: req.body.username,
    password: req.body.password

    }
   
    })
    res.json({
        id:user.id
    });
});

//SIGNIN

app.post("/api/v1/signin", async (req, res) => {
    const { success, data } = CreateUserSchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect credentials"
        });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            username: data.username
        }
    });

    if (!user) {
        res.status(401).json({
            message: "Incorrect username or password"
        });
        return;
    }

    if (user.password !== data.password) {
        res.status(401).json({
            message: "Incorrect username or password"
        });
        return;
    }

    res.json({
        id: user.id
    });
});





// AVATARS

app.post("/api/v1/avatar", async (req, res) => {
  const { success, data } = CreateAvatarSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Incorrect",
    });
    return;
  }
  const leftProfileId = uuidv4();
  const rightProfileId = uuidv4();
  const frontProfileId = uuidv4();
  await Promise.all([
    createImage("create a side profile for the user for the left side. it should be high in quality portfolio to shoot type photo",data.image, `./assests/${leftProfileId}.png`),
    createImage("create a side profile for the user for the right side. it should be high in quality portfolio to shoot type photo",data.image, `./assests/${rightProfileId}.png`),
    createImage("create a front profile for the user for the front side. it should be high in quality portfolio to shoot type photo",data.image, `./assests/${frontProfileId}.png`)  
  ])

  //put in s3 in the db.ts

  res.json({
    message: "Avatar generated successfully",
  });
});

app.get("/api/v1/avatar/:avatarId",(req,res)=>{
    res.json({});
});

app.get("/api/v1/avatars",(req,res)=>{
    res.json();
});


//Video

app.post("/api/v1/video",async (req,res)=>{
  await generateVideo("The video opens with a medium, eye-level shot of a beautiful man with dark hair and warm brown eyes. he wears a magnificent, high-fashion flamingo dress with layers of pink and fuchsia feathers, complemented by whimsical pink, heart-shaped sunglasses. he walks with serene confidence through the crystal-clear, shallow turquoise water of a sun-drenched lagoon. The camera slowly pulls back to a medium-wide shot, revealing the breathtaking scene as the dress's long train glides and floats gracefully on the water's surface behind him. The cinematic, dreamlike atmosphere is enhanced by the vibrant colors of the dress against the serene, minimalist landscape, capturing a moment of pure elegance and high-fashion fantasy.",
    ["https://randomuser.me/api/portraits/men/75.jpg?utm_source=chatgpt.com",
      "https://randomuser.me/api/portraits/men/76.jpg?utm_source=chatgpt.com",
      "https://randomuser.me/api/portraits/men/77.jpg?utm_source=chatgpt.com"
    ], "./output/video.mp4")
    res.json({});
});

app.get("/api/v1/video/:videoId",(req,res)=>{
  res.json({});
});

app.get("/api/v1/videos",(req,res)=>{
  res.json({});
});

app.get("/api/v1/me",(req,res)=>{
  res.json({});
});

app.get("/api/v1/models",(req,res)=>{
  res.json({});
});


app.listen(5417, () => {
    console.log("Server is running on port 5417");
});