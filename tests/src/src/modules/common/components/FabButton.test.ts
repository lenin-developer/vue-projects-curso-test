import FabButton from '@/modules/common/components/FabButton.vue';
import {shallowMount} from '@vue/test-utils';

describe('FaButton', () => {
    test('prop position value defaul', () => {
        const wrapper =  shallowMount(FabButton);

        expect(wrapper.props().position).toBe('bottom-right')
    });

    test('prop position setValue', () => {
        const wrapper =  shallowMount(FabButton,{
            props: {
                position: 'top-left'
            }
        });


        const btn = wrapper.find('button');
        expect(btn.classes('top-left')).toBeTruthy()

    });

    test('slot render ', () => {
        const wrapper = shallowMount(FabButton , {
            slots: {
                default: '<span>hola</span>'
            }
        });

        const slot =  wrapper.find('span')
        expect(slot.exists()).toBe(true)
        
    });
    

});
