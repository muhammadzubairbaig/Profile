import { format } from 'date-fns';
import { addDays } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import Label from './Label';

const AddInputFields = ({ form, buttonText, name, selectedFields }) => {
    /**
  * @Variables and @Hooks
  */
    const [birthDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [present, setPresent] = useState();
    const [formValues, setFormValues] = useState([{ from: null, to: null, name: '', description: '' }])


    /**
* @Functions
*/
    useEffect(() => {
        if (selectedFields) {
            setFormValues(selectedFields);
        }
        form(formValues);
    }, [formValues, form, selectedFields])


    let handleChange = (i, e, type) => {
        formValues[i][type] = e.target.value
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { from: new Date(), to: new Date(), name: '', description: '' }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const handlePresentChange = (i, e) => {
        setPresent(prev => !prev);
        formValues[i].isPresent = !present;
        if (!present) {
            formValues[i]['to'] = ''
        }
    }

    return (
        <form>
            {formValues.map((element, index) => (
                <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6 " key={index}>
                    <div className="sm:col-span-2">
                        <Label title={'From*'} />
                        <div className="mt-1">
                            <input
                                type="date"
                                name="from"
                                max={birthDate}
                                value={element.from || ''}
                                onChange={e => handleChange(index, e, 'from')}
                                id="from"
                                className="border-2 p-2 block w-full sm:text-sm border-gray-200 rounded-md outline-none"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Label title={'to*'} />
                        <div className="mt-1">
                            <input
                                type="date"
                                name="toDate"
                                disabled={present && index === 0 ? true : false}
                                value={element.to || ''}
                                min={format(addDays(new Date(element.from), 1), 'yyyy-MM-dd')}
                                onChange={e => handleChange(index, e, 'to')}
                                id="toDate"
                                className="border-2 p-2 block w-full sm:text-sm border-gray-200 rounded-md outline-none"
                            />
                        </div>
                        {index === 0 && selectedFields ?
                            <div className='flex'>
                                <div>Present</div>
                                <input type={'checkbox'} defaultChecked={element.isPresent}
                                    className="h-4 w-4 ml-2 mt-1"
                                    onChange={(e) => handlePresentChange(index, e)} />

                            </div> : ''}
                    </div>
                    <div className="sm:col-span-2">
                        <Label title={`${name}*`} />
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={element.name || ''}
                                onChange={e => handleChange(index, e, 'name')}
                                className="border-2 p-2 block w-full sm:text-sm border-gray-200 rounded-md outline-none"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <Label title={'Description'} />
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            value={element.description || ''}
                            onChange={e => handleChange(index, e, 'description')}
                            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            defaultValue={''}
                        />
                    </div>
                    {
                        index ?
                            <button type="button" className="-mt-3 button remove text-start text-red-700 font-semibold" onClick={() => removeFormFields(index)}>Remove</button>
                            : null
                    }
                </div>

            ))}
            <div className="button-section">
                <button className="button add mt-2 text-blue-800 font-bold" type="button" onClick={() => addFormFields()}>
                    {buttonText}</button>
            </div>
        </form>
    )
}

export default AddInputFields