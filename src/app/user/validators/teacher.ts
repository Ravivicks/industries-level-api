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

  
  export class updateTeacherValidator {

    // @IsMongoId()
    // @IsString()
    // @IsNotEmpty()
    // @IsDefined()
    // studentId!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    organizationId!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    TeacherSubject!: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    batch!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    specialization!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;
  }
  export class deleteTeacherValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;
  }
  export class findByIdTeacherValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId!: string;
  }