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
import cors from "cors";

const app = express();
app.use(cors());

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

app.get("/api/v1/avatar/:avatarId", async (req,res)=>{
    const avatars = await prisma.avatar.findMany({
        where : {
            userId : "1",
        }
    })
    res.json({avatars});
})


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

  try {
    // 1. SAVE TO DATABASE
    const avatar = await prisma.avatar.create({
      data: {
        userId: "1",
        name: data.name,
      },
    });

    // 2. SEND RESPONSE IMMEDIATELY
    res.status(200).json({
      message: "Avatar created successfully",
      avatar,
    });

    // 3. GENERATE IMAGES IN BACKGROUND
    const leftProfileId = uuidv4();
    const rightProfileId = uuidv4();
    const frontProfileId = uuidv4();

    try {
      await Promise.all([
        createImage(
          "Create a high-quality left-side profile of the person. Portfolio-quality photography.",
          data.image,
          `./assets/${leftProfileId}.png`
        ),

        createImage(
          "Create a high-quality right-side profile of the person. Portfolio-quality photography.",
          data.image,
          `./assets/${rightProfileId}.png`
        ),

        createImage(
          "Create a high-quality front profile of the person. Portfolio-quality photography.",
          data.image,
          `./assets/${frontProfileId}.png`
        ),
      ]);

      console.log("Images generated successfully");
    } catch (error) {
      console.error("Image generation failed:", error);
    }

  } catch (error) {
    console.error("Avatar creation failed:", error);

    res.status(500).json({
      message: "Failed to create avatar",
    });
  }
});

app.get("/api/v1/avatar/:avatarId",(req,res)=>{
    res.json({});
});

app.get("/api/v1/avatars", async (req, res) => {
    const avatars = await prisma.avatar.findMany({
        where: {
            userId: "1",
        }
    })

    res.json({avatars});
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