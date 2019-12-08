const express = require('express');

function createRouter(db) {
  const router = express.Router();
  

  // the routes are defined here
  /*router.post('/booking', (req, res, next) => {
    db.query(
      'INSERT INTO bookings (employee, firstname, lastname, time, date) VALUES (?,?,?,?,?)',
      [req.body.employee, req.body.firstname, req.body.lastname, new Time(req.body.time), new Date(req.body.date)],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
*/

  router.get('/booking', (req, res)=> {
    db.query(
      'SELECT * FROM bookings', (err, rows, fields) => {
        if (err) {
          console.log(err);
          //res.status(500).json({status: 'error'});
          
        } else {
            res.send(rows);
          //res.status(200).json(results);
        }
      });
  });
 

  router.get('/openapp/:date', (req, res)=> {
    db.query(
      'SELECT * FROM openApp WHERE date = ?',[req.params.date], (err, rows, fields) => {
        if (err) {
          console.log(err);
          //res.status(500).json({status: 'error'});
          
        } else {
            res.send(rows);
          //res.status(200).json(results);
        }
      });
  });

  router.post('/booking', (req, res, next) => {
    console.log("before q");
    db.query(
      'INSERT INTO bookings (employee, firstname, lastname, date, time) VALUES (?,?,?,?,?)',
      [req.body.employee, req.body.firstname, req.body.lastname, req.body.date, req.body.time],
      (error) => {
        if (error) {
          console.error(error);
          //console.log(req);
          res.status(500).json({status: 'error'});
        } else {
            //console.log(req);
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.post('/booking/delete', (req, res, next) => {
      console.log("before q1");
    db.query(
      'DELETE FROM openApp WHERE employee=? and date=? and time=?',
      [req.body.employee, req.body.date, req.body.time],
      (error) => {
          
        if (error) {
          console.error(error);
          
          res.status(500).json({status: 'error'});
        } else {
           
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/booking/:id', (req, res)=> {
    db.query(
      'DELETE FROM bookings WHERE id = ?',[req.params.id], (err, rows, fields) => {
        if (err) {
          console.log(err);
          //res.status(500).json({status: 'error'});
          
        } else {
            res.status(200).json({status: 'ok'});          //res.status(200).json(results);
        }
      });
  });

  return router;
}

module.exports = createRouter