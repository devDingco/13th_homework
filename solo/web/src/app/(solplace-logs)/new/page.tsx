import { EInputPlaceholder, EInputTitle } from '@/types/input.type';

import AddressWrapper from './_components/AddressWrapper';
import Button from '@/components/Button';
import InputWrapper from '@/components/InputWrapper';

export default function NewPage() {    
    return (
        <div className="flex flex-col px-5 gap-4">
            <InputWrapper name={EInputTitle.NEW} placeholder={EInputPlaceholder.NEW}/>
            <AddressWrapper />
            <InputWrapper name={EInputTitle.CONTENT} placeholder={EInputPlaceholder.CONTENT} textarea={true}/>
            <Button />
        </div>
    );
}
