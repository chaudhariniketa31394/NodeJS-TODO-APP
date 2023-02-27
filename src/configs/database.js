config = {
    uri: 'mongodb+srv://todo-api:hZkweFmNN2Lq1cJD@cluster0.lwtdotm.mongodb.net/todo-app?retryWrites=true&w=majority',
    options: {
        dbName: 'todo-app',
        useNewUrlParser: true
    },
}

JWT_SECRETE =  'kjahdkjafdjawgfkjsgfkjsgfkjsgfjsgfhjfnmmzbjshfkjgsf'

const getMailConfig = {    
      MAIL_SETTINGS: {
        service: 'gmail',
        auth: {
          user: 'udayaditya.singh@gmail.com',
          pass: 'eyelkzjbgqllegkt',
        },
      }
    
  }


module.exports = {config,JWT_SECRETE,getMailConfig}
// DB_USER=todo-api
// DB_PWD=hZkweFmNN2Lq1cJD
// DB_HOST=cluster0.lwtdotm.mongodb.net
// DB_NAME=todo

//mongodb+srv://todo-api:hZkweFmNN2Lq1cJD@$cluster0.lwtdotm.mongodb.net/todo?retryWrites=true&w=majority