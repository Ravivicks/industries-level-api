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

  // export class createStudentValidator {

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsDefined()
  //   rollNumber!: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsDefined()
  //   studentClass!: string;


  //   @IsString()
  //   @IsNotEmpty()
  //   @IsDefined()
  //   collageName!: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsDefined()
  //   courseName!: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsDefined()
  //   userId!: string;

  // }
  export class updateStudentValidator {

    // @IsMongoId()
    // @IsString()
    // @IsNotEmpty()
    // @IsDefined()
    // studentId!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    rollNumber!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    studentClass!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    collageName!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    courseName!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;
  }
  export class deleteStudentValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;
  }
  export class findByIdStudentValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;
  }