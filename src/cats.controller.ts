import { Controller, Get, Post, Req, HttpCode, Header, Param, BadRequestException } from '@nestjs/common';
import { log } from 'console';
import { Request } from 'express';

type sex = "male" | "female";

interface Cat {
  id: number;
  name: string;
  breed: string;
  sex: sex;
  age: number;
}

let cats: Cat[] = [
  {id: 1, name: 'Neko', breed: 'American shorthair', sex: 'female', age: 3 },
  {id: 2, name: 'Lichi', breed: 'Persian cat', sex: "male", age: 3 },
  {id: 3,name: "Aki", breed: "Scottish Fold", sex: "female", age: 1},
];

//specify endpoints inside Controller decorator
@Controller("cats")
export class CatsController {

  @Get()
  getAll(): Cat[] {
    return cats;
  }

  @Get("breeds")
  getBreed(): string[] {
    return cats.map(cat => cat.breed);
  }

  @Get(":id")
  findAll(@Param() params: any): Cat {
   let requestedCat: Cat = cats.find(cat => cat.id == params.id); 
   if(requestedCat !== undefined) return requestedCat;
   throw new BadRequestException('Cant find cat with such id'); 
  }  

  @Post()
  @Header("Cache-Control", "none")
  @HttpCode(204)
  create(): string {
    return "new cat was added";
  }
}