# Top Player
- Application: display contents related to a song along with media control
- Development: follow steps in Table of Content in sequence

# Table of Content
1. [Requirements](#requirements)
2. [Environment Set Up](#environment%20set%20up)
3. [Data Creation](#data%20creation)
4. [Seeding Database](#seeding%20database)
6. [Build the Front End Bundle File](#building%20the%20front%20end%20bundle%20file)
7. [Module's API](#module's%20api)
- [Create a new comment](#create%20a%20new%20comment)
- [Create a new sub comment](#create%20a%20new%20sub%20comment)
- [Read song's detail](#read%20song's%20detail)
- [Update a comment](#update%20a%20comment)
- [Delete a comment](#delete%20%a%20comment)
8. [Set Up Server](#set%20up%20server)
9. [Use the Application](#use%20the%20application)

## Requirements
```sh
node 8.17
```

## Environment Set Up
**NOTE: All shell commands are to be entered in the project root directorate**
Run `npm install` in the command line

## Data Creation

## Seeding Database

## Build the Front End Bundle File
Run `npm run react-dev` in the command line


## Module's API
### Create a new comment
```sh
POST /API/comments
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `songid` | `number` | The songid of the song where the comment were created in |
| `time` | `number` | The instant during the song where the comment is inserted, represented in seconds |
| `comment` | `string` | The comment of the user |
| `userid` | `number` | The userid that left the comment |

#### Example input
```sh
{
  "songid": "8367393",
  "time": "68",
  "comment": "some comment",
  "userid": "124212"
}
```

#### Response
```sh
Status: 201 Created
```

### Create a new reply
```sh
POST /API/replies
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `commentid` | `number` | the id of the comment replied to |
| `reply` | `string` | The reply of the user |
| `userid` | `number` | The userid that left the reply |

#### Example input
```sh
{
  "commentid": "438439"
  "reply": "some reply",
  "userid": "349023"
}
```

#### Response
```sh
Status: 201 Created
```

### Read Song Details
```sh
GET /API/songs/:songid/songdetails
```

#### Response
```sh
Status: 200 OK
```
```sh
{
  "songName": "Name of the Song",
  "songArtist": "Name of the Artist",
  "songPlaylist": "Name of the Playlist",
  "age": "17",
  "tag": "#coolTag",
  "songCover": "http://amazons3.coolSong.songCover.jpg",
  "soundWaveImage": "http://amazons3.coolSong.soundWaveImage.jpg"
  "songFile": "http://amazons3.coolSong.songFile.mp3",
  "comments":
  [
    {
      "commentid": "1323",
      "comment": "some comment",
      "userid": "495738",
      "username": "some user",
      "useravatar": "http://amazons3.somecoolavatar.jpg",
      "time": "89",
      "replies":
      [
        {
          "replyid": "976038",
          "reply": "some cool reply",
          "userid": "495738",
          "username": "some user"
        },
        {
          "replyid": "463847",
          "reply": "some other cool reply",
          "userid": "937433",
          "username": "some other user"
        }
      ]
    },
    {
      "commentid": "34385",
      "comment": "some toher comment",
      "userid": "439047",
      "username": "some other user",
      "useravatar": "http://amazons3.somecoolavatar.jpg",
      "time": "137",
      "replies": []
    }
  ]
}
```

### Update a comment
```sh
PUT /comments/:commentid
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `time` | `number` | The instant during the song where the comment is inserted represented in seconds |
| `comment` | `string` | The comment of the user |
| `userid` | `number` | The userid that left the comment |

#### Example input
```sh
{
  "time": "68",
  "comment": "some comment",
  "userid": "83438439"
}
```

#### Response
```sh
Status: 200 OK
```

### Delete a comment
```sh
DELETE /comments/:commentid
```

#### Response
```sh
Status: 200 OK
```

## Set Up Server
run `npm run server-dev` in the command line

## Use the Application
In your browser (preferably Google Chrome), go to `http://localhost:3001`
Enjoy!