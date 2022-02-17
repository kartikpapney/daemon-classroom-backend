const User = require('../model/user.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const key = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
const hashKey = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
const sha256 = require('js-sha256');
const { ObjectId } = require('mongodb');

const hashString = async(str) => {
    return sha256.sha256.hmac(hashKey, str)
}

const verify = async(req, res, next) => {
    jwt.verify(req.body.token, key, (err, authData) => {
        if(err) {
            res.status(403).send(err);
        } else {
            req.user = authData.user;
            next();
        }
    });
}

// const generateRefreshToken = async(req, res, next) => {

// }


const login = async(req, res, next) => {
    const _id = await hashString(req.body.emailID);
    const password = await hashString(req.body.password);
    User.findOne({ _id: _id, password: password}, {__v: 0, _id: 0, password: 0}, (err, user) => {
        if ( err ) {
            res.status(400).send({error: "Unwanted error"});
        } else if ( !user ) {
            res.status(404).send({error: "No User Exist"});
        } else {
            jwt.sign({user}, key, { expiresIn: '30s' }, (err, token) => {
                if(err) {
                    res.status(400).json({error: "Unwanted Error"});
                    resolve();
                } else {
                    res.status(200).json({token: token});
                    resolve();
                }
            });
        }
    });
}

const signup = async(req, res) => {
    const _id = await hashString(req.body.emailID);
    const password = await hashString(req.body.password);
    User.findOne({ _id: _id}, (err, exists) => {
        if ( err ) {
            res.status(400).send({error: "Unwanted error"});
        } else if ( exists ) {
            res.status(409).send({error: "User already exist"});
        } else {
            const user = new User({
                _id: _id,
                name: req.body.name, 
                authority: req.body.authority,
                mobileNo: req.body.mobileNo,
                emailID: req.body.emailID,
                password: password
            });
            user.save();
            res.status(201).send({result: "User Created"});
        }
    });
}

module.exports = {login, signup, verify};