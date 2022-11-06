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
    IsNumber,
  } from 'class-validator';

  export class loginUserValidator {


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password!: string;

  }

  export class forgotPasswordValidator {


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email!: string;

  }

  export class resetPasswordValidator {


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    newPassword!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    confirmPassword!: string;

  }

  export class verifyOtpValidator {


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    otp!: string;

  }
  