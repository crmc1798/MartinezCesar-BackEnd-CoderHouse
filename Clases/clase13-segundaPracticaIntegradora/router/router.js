const {Router} = require('express');
const passport = require('passport');

class Route {
    constructor(){
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init(){}

    post(path, ...callbacks){
        this.router.post(
            path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    get(path, policies, ...callbacks){
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = (playload) => res.send({ status: 200, playload});
        res.sendServerError = (error) => res.send({ status: 500, error});
        res.sendUserError = (error) => res.send({ status: 400, error});
        next();
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
          try {
            await callback.apply(this, params);
          } catch (error) {
            console.log(error);
            params[1].status(500).send(error);
          }
        });
      }

    handlePolicies = (policies) => {
        if(policies[0] === 'PUBLIC'){
            return (req, res, next) => {
                next();
            }
        }
        return async (req, res, next) => {
            passport.authenticate('jwt',  function( err, user, info){
                if(err) return next(err);
                if(!user) {
                    return res.status(401).send({error: info.messages ? info. messages : 'ocurrio error en la validacion'});
                }
                if(user.role !== policies[0]){
                    return res.status(403).send({error: 'forbidden. no tienes los permisos para acceder'});
                }
                req.user = user;
                next();
            })(req, res, next);
        }
    }
}

module.exports = Route;