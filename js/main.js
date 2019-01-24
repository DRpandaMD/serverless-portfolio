import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from "./example-work";

const myWork = [
    {
        'title': "Serverless Blog",
        'href': "https://blog.zaratedev.org/",
        'desc': "My Serverless Blog I made using Hexo and AWS!",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': "This is just a screen shot of our code :) "
        }
    },
    {
        'title': "Work Example 2",
        'href' : "https://example.com",
        'desc' : "Donec felis dui, viverra quis massa eget, malesuada fringilla felis. Etiam nec eros id arcu semper lacinia et eget mauris. Pellentesque blandit justo felis, et tempus purus dapibus pulvinar. Donec consectetur porttitor dui, et eleifend sapien blandit vitae. Aliquam at malesuada massa, at rutrum sapien. Donec ullamcorper libero sit amet nibh lacinia viverra. Suspendisse sollicitudin elementum sem. Donec tincidunt augue hendrerit libero semper, ac tempus ante pharetra. Sed vel accumsan velit. Aenean eget accumsan turpis.",
        'image': {
            'desc': "example screenshot of a project involving chemistry",
            'src': "images/example2.png",
            'comment': "Chemistry” by Surian Soosay is licensed under CC BY 2.0 https://www.flickr.com/photos/ssoosay/4097410999"
        }
    },
    {
        'title': "Work Example 3",
        'href' : "https://example.com",
        'desc' : "Donec ut quam molestie, malesuada libero eu, posuere turpis. Phasellus hendrerit diam in augue molestie condimentum. In eu porta lacus. Curabitur gravida quam ac orci posuere, at tempor sem viverra. Nam et nisi ut ligula consequat mattis vitae quis felis. Ut scelerisque sem enim, volutpat lobortis ante efficitur at. Fusce id enim in tellus porttitor cursus vel non quam. Nam at purus laoreet ante aliquet rutrum. Pellentesque ut nibh sem. Ut id hendrerit felis. Aenean convallis leo eu diam elementum, nec cursus metus vestibulum.",
        'image': {
            'desc': "example screenshot of a project involving cats",
            'src': "images/example3.png",
            'comment': `"Bengal cat” by roberto shabs is licensed under CC BY 2.0" 
                        https://www.flickr.com/photos/37287295@N00/2540855181`
        }
    }
]

ReactDOM.render(<ExampleWork work={myWork}/>, document.getElementById('example-work'));