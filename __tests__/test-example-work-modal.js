import React from 'react';
import {shallow}  from 'enzyme';
import ExampleWorkModal from '../js/example-work-modal'

import Enzyme from "enzyme";
import Adaptor from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adaptor() });


const myWork = [
    {
        'title': "Work Example One",
        'href': "https://example.com",
        'desc': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate finibus felis sagittis aliquet. Phasellus ullamcorper, quam nec lobortis maximus, lectus elit dignissim velit, ut varius purus neque a massa. Integer egestas eget elit lacinia commodo. Suspendisse tempor ex enim, nec convallis felis tincidunt id. Duis fringilla ipsum porta tristique elementum. Duis consectetur metus non congue ultricies. Nulla eu nisi odio. Sed sed egestas arcu.",
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
    }
];

describe("ExampleWorkModal component", () => {

    let component = shallow(<ExampleWorkModal example = {myWork[0]}/>);
    let anchors = component.find("a");
   

    it("Should have one 'a' element", () => {
        expect(anchors.length).toEqual(1);
    });

    it("Should link to our project", () => {
        expect(anchors.prop.href).toEqual(myWork.href);
    });

});