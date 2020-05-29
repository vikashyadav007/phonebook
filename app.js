const Express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const User = require('./models/user');
const Sequelize = require('sequelize');
const sequelize = require('./util/database');
const config = require('./config/config.js');


const app = new Express()
app.use(Express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.json())

app.set('view engine','ejs');
app.set('views','views');
app.set('port',process.env.PORT || 3000);
app.set('host',config.host);


app.get('/',(req,res,next)=>{
    User.findAll().then((user)=>{
        console.log(user.length);
        res.render('index',{
            user:user
        })
    })
})

app.post('/',(req,res,next)=>{
    console.log(req.body.name);
    const arg =  req.body.name + '%'
    const Op = Sequelize.Op; 
    User.findAll({where:{name:{[Op.like]:arg}}}).then((user)=>{
        console.log(user.length);
        new_user = user;
        res.json({
            user:user
        })
    })
});

app.get('/add',(req,res,next)=>{
    res.render('edit',{
        editable:false,
        user:null,
    })
});

app.post('/add',(req,res,next)=>{
    console.log(req.body)
    let _name = req.body.name;
    let _dob = req.body.dob;
    let _number = req.body.number;
    let _email = req.body.email;
    console.log(_name)
    console.log(_dob)
    console.log(_number)
    console.log(_email)
    User.create({name:_name,dob:_dob,number:_number,email:_email}).then(result => {
        res.redirect('/');
    });
});

app.get('/edit/:userId',(req,res,next)=>{
    const _id = req.params.userId;
    console.log(_id);
    User.findAll({where:{id:_id}}).then((user)=>{
        res.render('edit',{
            editable:true,
            user:user[0],
        })
    })
});

app.post('/edit',(req,res,next)=>{
    const id = req.body.id;
    const name = req.body.name;
    const dob = req.body.dob;
    const number = req.body.number;
    const email = req.body.email;
    console.log(id);
    console.log(name);
    console.log(dob);
    console.log(number);
    console.log(email);
    User.findByPk(id)
        .then(user =>{
            user.name = name;
            user.dob = dob;
            user.number = number;
            user.email = email;
            return user.save();
        })
        .then(result =>{
            console.log("Updatted successfully...");
            res.redirect("/");
        }).catch(err=>{
            console.error(err);
        });
})

app.post('/remove/:userId',(req,res,next)=>{
  const _id = req.params.userId;
  User.findByPk(_id)
      .then(user =>{
          return user.destroy();
      })
      .then(result =>{
          console.log('Destroyed Successfully...');
          res.redirect('/');
      })
      .catch(err => console.error(err));
})

sequelize
    .sync()
    .then((result)=>{
        app.listen(app.get('port'),()=>console.log( "Listining on port: "+ app.get('port')));
    })
