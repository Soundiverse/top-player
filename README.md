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
POST /songs/:songid
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `time` | `number` | The instant during the song where the comment is inserted represented in seconds |
| `comment` | `string` | The comment of the user |
| `user` | `string` | The user that left the comment |

#### Example input
```sh
{
  "time": "68",
  "comment": "some comment",
  "user": "exampleusername"
}
```

#### Response
```sh
Status: 201 Created
```

### Create a new sub comment
```sh
POST /songs/:songid/comments/:commentid
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `time` | `number` | The instant during the song where the comment is inserted represented in seconds |
| `comment` | `string` | The comment of the user |
| `user` | `string` | The user that left the comment |

#### Example input
```sh
{
  "time": "68",
  "comment": "some sub comment",
  "user": "exampleusername"
}
```

#### Response
```sh
Status: 201 Created
```

### Read comments
```sh
GET /songs/:songid/
```

#### Response
```sh
Status: 200 OK
```
```sh
{
  "songName": "Name of the Song",
  "songArtist": "Name of the Artist",
  "ageOfSong": "5 months",
  "tagOfSong": "#coolTag",
  "imageOfSong": "http://amazons3.coolSong.jpg",
  "urlOfSong": "http://amazons3.coolSong.mp3",
  "comments":
  {
    "comments": ["comment1", "comment2", "comment3"],
    "commentids" ["1", "2", "3"],
    "users": ["user1", "user1", "user5"],
    "time": ["7", "121", "300"]
  }
}
```

### Update a comment
```sh
PUT /songs/:songid/comments/:commentid
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `time` | `number` | The instant during the song where the comment is inserted represented in seconds |
| `comment` | `string` | The comment of the user |
| `user` | `string` | The user that left the comment |

#### Example input
```sh
{
  "time": "68",
  "comment": "some comment",
  "user": "exampleusername"
}
```

#### Response
```sh
Status: 200 OK
```

### Delete a comment
```sh
DELETE /songs/:songid/comments/:commentid
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