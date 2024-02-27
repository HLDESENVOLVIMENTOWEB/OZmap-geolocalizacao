"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mongoose = __importStar(require("mongoose"));
const supertest = __importStar(require("supertest"));
const sinon = __importStar(require("sinon"));
const faker_1 = require("@faker-js/faker");
const chai_1 = require("chai");
require("./database");
const models_1 = require("./models");
const lib_1 = __importDefault(require("./lib"));
const server_1 = __importDefault(require("./server"));
describe('Models', () => {
    let user;
    let session;
    let geoLibStub = {};
    before(async () => {
        geoLibStub.getAddressFromCoordinates = sinon.stub(lib_1.default, 'getAddressFromCoordinates').resolves(faker_1.faker.location.streetAddress({ useFullAddress: true }));
        geoLibStub.getCoordinatesFromAddress = sinon.stub(lib_1.default, 'getCoordinatesFromAddress').resolves({ lat: faker_1.faker.location.latitude(), lng: faker_1.faker.location.longitude() });
        session = await mongoose.startSession();
        user = await models_1.UserModel.create({
            name: faker_1.faker.person.firstName(),
            email: faker_1.faker.internet.email(),
            address: faker_1.faker.location.streetAddress({ useFullAddress: true }),
        });
    });
    after(() => {
        sinon.restore();
        session.endSession();
    });
    beforeEach(() => {
        session.startTransaction();
    });
    afterEach(() => {
        session.commitTransaction();
    });
    describe('UserModel', () => {
        it('should create a user', async () => {
            (0, chai_1.expect)(1).to.be.eq(1);
        });
    });
    describe('RegionModel', () => {
        it('should create a region', async () => {
            const regionData = {
                user: user._id,
                name: faker_1.faker.person.fullName()
            };
            const [region] = await models_1.RegionModel.create([regionData]);
            (0, chai_1.expect)(region).to.deep.include(regionData);
        });
        it('should rollback changes in case of failure', async () => {
            const userRecord = await models_1.UserModel.findOne({ _id: user._id }).select('regions').lean();
            try {
                await models_1.RegionModel.create([{ user: user._id }]);
                chai_1.assert.fail('Should have thrown an error');
            }
            catch (error) {
                const updatedUserRecord = await models_1.UserModel.findOne({ _id: user._id }).select('regions').lean();
                (0, chai_1.expect)(userRecord).to.deep.eq(updatedUserRecord);
            }
        });
    });
    it('should return a list of users', async () => {
        const response = supertest(server_1.default).get(`/user`);
        (0, chai_1.expect)(response).to.have.property('status', 200);
    });
    it('should return a user', async () => {
        const response = await supertest(server_1.default).get(`/users/${user._id}`);
        (0, chai_1.expect)(response).to.have.property('status', 200);
    });
});
//# sourceMappingURL=all.spec.js.map