import express from 'express';
import bodyParser from 'body-parser';
// import multer from 'multer';
// import path from 'path';

const app = express();
const port = 3000;
let blogs = [];

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)) // Append extension
//   }
// });

// const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.render('index', { blogs: blogs });
});

app.get('/add-blog', (req, res) => {
  res.render('add-blog');
});

app.post('/add-submit', (req, res) => {
  const data = {
    title: req.body.title,
    field: req.body.field,
    para: req.body.para,
  };
  blogs.push(data);
  res.redirect('/');
});

app.get('/edit-blog/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < blogs.length) {
    const blog = blogs[index];
    res.render('edit-blog', { blog: blog, index: index });
  } else {
    res.status(400).send('Invalid index');
  }
});

app.post('/edit-submit/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < blogs.length) {
    blogs[index] = {
      title: req.body.title,
      field: req.body.field,
      para: req.body.para,
      // thumbnail: req.file ? `/uploads/${req.file.filename}` : blogs[index].thumbnail
    };
    res.redirect('/');
  } else {
    res.status(400).send('Invalid index');
  }
});

app.delete('/delete-blog/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < blogs.length) {
    blogs.splice(index, 1);
    res.status(200).send();
  } else {
    res.status(400).send('Invalid index');
  }
});
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
