import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsString,
    IsNotEmpty,
    IsDefined,
    IsPhoneNumber,
    IsMongoId,
  } from 'class-validator';

  export class createUserValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userType!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    firstName!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    lastName!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsPhoneNumber()
    phone!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userStatus!: string;
  }
  export class updateUserValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userType!: string;

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    firstName!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    lastName!: string;

    // @IsString()
    // address!: string;

    // @IsString()
    // nationality!: string;

    // @IsString()
    // dob!: string;

    // @IsString()
    // gender!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsPhoneNumber()
    phone!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userStatus!: string;
  }
  export class deleteUserValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;
  }