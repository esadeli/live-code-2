'use strict'

const Video = require('../models/video')

class VideoController {

    // show video
    static listvideos(req,res) {
        Video.find({})
          .then(videos => {
              let sortedArr = []
              videos.forEach(videop =>{
                  if(videop.likes.length > 0){
                      sortedArr.push(videop)
                  }
              })

              res.status(200).json({
                  msg: 'List of videos',
                  data: sortedArr
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Get List Videos', error
              })
          })
    }

    // likes video
    static likesvideo (req,res) {
        // check if video exist
        Video.findOne({
            url: req.body.url
        })
          .then(video => {
              // video is in the database
              if(video){
                // if video found check likes
                if(video.likes.indexOf(req.decoded.userid) === -1) {
                        Video.findOneAndUpdate({
                            url: req.body.url
                        },{
                            $push: {
                                likes: req.decoded.userid
                            }
                        })
                        .then(video => {
                            res.status(201).json({
                                msg: 'Video has been liked',
                                data: video
                            })
                        })
                        .catch(error => {
                            res.status(500).json({
                                msg: 'ERROR Likes video ',error
                            })
                        })
                    } else if (video.likes.indexOf(req.decoded.userid) !== -1) {
                        Video.findOneAndUpdate({
                            url: req.body.url
                        },{
                            $pull: {
                                likes: req.decoded.userid
                            }
                        })
                            .then(video => {
                                res.status(201).json({
                                    msg: 'Like has been cancelled',
                                    data: video
                                })
                        })
                            .catch(error => {
                                res.status(500).json({
                                    msg: 'ERROR Likes video ',error
                                })
                            })
                    }
              } else {
                 Video.create({
                    title: req.body.title,
                    url: req.body.url
                 })
                   .then(videocreate => {
                       Video.findOneAndUpdate({
                           _id: videocreate._id
                       },{
                           $push: {
                               likes: req.decoded.userid
                           }
                       })
                         .then(video => {
                            res.status(201).json({
                                msg: 'Success Like Video for the first time',
                                data: video
                            })
                         }) 
                         .catch(error => {
                             res.status(500).json({
                                 msg: 'ERROR Like Video after create ',error
                             })
                         })
                   })
                   .catch(error => {
                       res.status(500).json({
                           msg: 'ERROR Create video ',error
                       })
                   })
              }              
          })
          .catch (error => {
              res.status(500).json({
                  msg: 'ERROR Find Video Like, Unlike ',error
              })
          })

    }
}

module.exports = VideoController