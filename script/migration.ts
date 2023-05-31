require('dotenv').config()
const mongoose=require('mongoose');
import RoleModel from './../src/core/shared/models/RoleModel';
import AppUserModel from '../src/core/shared/models/AppUserModel';
import {_servGeneral} from '../src/core/shared/dependencies';
import DocumentTypeModel from '../src/core/shared/models/DocumentTypeModel';
import PaymentTypeModel from '../src/core/shared/models/PaymentTypeModel';


// Función de migración
async function migrate() {

  const _uri=`mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`

  const _options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retrywrites: false,
    ssl: false,
    sslValidate: false,
    directConnection: true,
    authSource: 'admin'
  }

  await mongoose.connect(_uri,_options)

  const _roles=[
    {_id: "rol_god",name: "SuperAdmin",description: 'System God'},
    {_id: "rol_admin",name: "Admin",description: 'System administrator'},
    {_id: "rol_asistant",name: "Asistant",description: 'Doctor\'s assistant'},
    {_id: "rol_secretary",name: "Secretary",description: 'Secretary of the Medical Office'},
  ]

  const _documentTypes=[
    {_id: "doc_dni",document_name: "dni"},
    {_id: "doc_cedula",document_name: "cédula"},
    {_id: "doc_passport",document_name: "pasaporte"},
    {_id: "doc_driver_licence",document_name: "licencia de conducir"},
  ]

  const _paymentTypes=[
    {_id: "pay_payment",payment_name: "payment",description: 'Client Payment'},
    {_id: "pay_adjustment_up",payment_name: "adjustment up",description: 'Balance increase adjustment'},
    {_id: "pay_adjustment_down",payment_name: "adjustment down",description: 'Balance discount adjustment'},
    {_id: "pay_treatment",payment_name: "treatment",description: 'Add new Treatment Amount'},
  ]

  const _admin=[
    {
      _id: "d8f53c38-7c2c-401a-8653-bfc8ee3f6768",
      username: "superadmin",
      password: await _servGeneral.encyptData("admin14624982"),
      firstName: "super",
      lastName: "admin",
      occupation: "God Admin",
      active: true,
      rol: ['rol_god']
    }
  ]


  await RoleModel.deleteMany(
    {_id: {$in: _roles.map((_i) => _i._id)}}
  ).then(async (_) => {
    await RoleModel.insertMany(_roles)
  })
  await AppUserModel.deleteMany(
    {_id: {$in: _admin.map((_i) => _i._id)}}
  ).then(async (_) => {
    await AppUserModel.insertMany(_admin)
  })
  await DocumentTypeModel.deleteMany(
    {_id: {$in: _documentTypes.map((_i) => _i._id)}}
  ).then(async (_) => {
    await DocumentTypeModel.insertMany(_documentTypes)
  })
  await PaymentTypeModel.deleteMany(
    {_id: {$in: _paymentTypes.map((_i) => _i._id)}}
  ).then(async (_) => {
    await PaymentTypeModel.insertMany(_paymentTypes)
  })

}

migrate().then(() => {
  console.log('Migración completada.');
  process.exit(0)
}).catch((error) => {
  console.error('Error en la migración:',error);
  process.exit(1)
});