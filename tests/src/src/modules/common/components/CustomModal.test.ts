import CustomModal from '@/modules/common/components/CustomModal.vue';
import {mount} from '@vue/test-utils';

describe('CustomModal', () => {
    test('slot name render', () => {
        const wrapper = mount(CustomModal, {
            slots: {
                header: '<span>slot header</span>',
                body: '<span>slot body</span>',
                footer: '<span>slot footer</span>',
                
            }
        })

        const slots = wrapper.findAll('span');

        expect(slots?.[0].text()).toBe('slot header')
        expect(slots?.[1].text()).toBe('slot body')
        expect(slots?.[2].text()).toBe('slot footer')
    });
    
});
