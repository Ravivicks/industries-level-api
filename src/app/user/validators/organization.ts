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

  export class createOrganizationValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    organizationName!: string;


  }
  export class updateOrganizationValidator {


    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    organizationId!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    organizationName!: string;

    
  }
  export class deleteOrganizationValidator {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    organizationId!: string;
  }