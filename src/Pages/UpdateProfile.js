import { db, storage } from "../Firebase/Firebase"
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleSelectChip from "../Component/MultipleSelectChip";
import AddInputFields from "../Component/AddInputFields";
import { Snackbars } from "../Component/Snackbar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Spinner from "../Component/Spinner";
import { activityOptions, hobbiesOptions, languagesOptions, skillsOptions } from "../Constants/ProfileConstants";
import Label from "../Component/Label";
import { AppInput } from "../Component/AppInput";
import { AppTextarea } from "../Component/AppTextarea";
import { Heading } from "../Component/Heading";

export const UpdateProfile = () => {
    /**
 * @Variables and @Hooks
 */
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [profile, setProfile] = useState();
    const [workExperience, setWorkExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [educationValidation, setEducationValidation] = useState(false);
    const [workValidation, setWorkValidation] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [isUpload, setIsUpload] = useState(false);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [activity, setActivity] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const snackbarRef = useRef();
    const navigate = useNavigate();

    /** 
    * @Functions
    */
    useEffect(() => {
        getProfileData();
    }, [])

    const handleFileUpload = (e) => {
        setIsUpload(true);
        if (e === null) return;
        const imageRef = ref(storage, `images/${e.name}`);
        uploadBytes(imageRef, e).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList(prev => [...prev, url]);
            });
            setIsUpload(false);
        }).catch(err => setIsUpload(false))
    }

    const onSubmit = (data) => {
        if (!validForm()) {
            //Here we are using snackbar for display Error Warning
            snackbarRef.current.handleOpenSnackbar({ text: 'Fields Required', variant: 'warning' })
            return true;
        }
        data.skills = skills;
        data.languages = languages;
        data.hobbies = hobbies;
        data.activity = activity;
        data.workExperience = workExperience;
        data.education = education;
        data.imageUrl = imageList[imageList.length - 1];
        db
            .collection('profile')
            //Using 1 as consider a userID :- 
            // We dont have ID now but if we implement login flow so then we can catch ID through user data
            .doc('1')
            .set({ data });

        //Here we are using snackbar for display Success Message
        snackbarRef.current.handleOpenSnackbar({ text: 'Profile Updated', variant: 'success' })
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }

    const validForm = () => {
        let isValidExp = false;
        let isValidEdu = false;
        education.map(edu => {
            if (edu.from && (edu.to || edu.isPresent) && edu.name) {
                isValidEdu = true;
                setEducationValidation(false);
            }
            else {
                isValidEdu = false;
                setEducationValidation(true);
            }
            return isValidEdu
        })

        workExperience.map(edu => {
            if (edu.from && (edu.to || edu.isPresent) && edu.name) {
                isValidExp = true;
                setWorkValidation(false);
            }
            else {
                isValidExp = false;
                setWorkValidation(true);
            }
            return isValidExp;
        })
        return isValidExp && isValidEdu
    }

    const handleWorkExperience = (formValues) => {
        setWorkExperience(formValues);
    }

    const handleEducation = (formValues) => {
        setEducation(formValues);
    }

    const getProfileData = () => {
        db
            .collection('profile')
            .doc('1')
            .onSnapshot(snapshot => {
                const data = snapshot.data().data;
                setisLoading(true);
                setValue('about', data.about)
                setValue('address', data.address)
                setValue('city', data.city)
                setValue('code', data.code)
                setValue('country', data.country)
                setValue('email', data.email)
                setValue('firstName', data.firstName)
                setValue('title', data.title)
                setValue('lastName', data.lastName)
                setValue('region', data.region)
                setValue('date', data.date)
                setValue('githubUrl', data.githubUrl)
                setValue('linkedinUrl', data.linkedinUrl)
                setValue('phone', data.phone)
                setValue('portfolioUrl', data.portfolioUrl)
                setValue('imageUrl', data.imageUrl)
                setSkills(data.skills)
                setHobbies(data.hobbies)
                setLanguages(data.languages)
                setActivity(data.activity)
                setProfile(data);
                setImageList([data.imageUrl])
            })
    }

    return (
        <>
            {/* Here we are using loader to wait for our api response */}
            {!isLoading ? <Spinner /> :
                <form className="space-y-8 divide-y divide-gray-200 -mt-24 pb-8 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-2"
                    onSubmit={handleSubmit(onSubmit)}>
                    {profile ?
                        <>
                            <div className="space-y-8 divide-y divide-gray-200">
                                <div className="px-3">
                                    <div className="rounded-lg bg-white overflow-hidden shadow p-6">
                                        <Heading title={'Personal Information'} />

                                        <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                                            {/* START:- Here we are using AppInput and in this we are passing title, validation and classes */}
                                            <AppInput
                                                registerProps={{ ...register("firstName", { required: true }) }}
                                                className={'sm:col-span-3'} title={'First name'}>
                                                {errors.firstName && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("lastName", { required: true }) }}
                                                className={'sm:col-span-3'} title={'Last name'}>
                                                {errors.lastName && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("email", { required: true }) }}
                                                className={'sm:col-span-3'} title={'Email address'}>
                                                {errors.email && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("phone", { required: true }) }}
                                                className={'sm:col-span-3'} title={'Contact'} inputType={'number'}>
                                                {errors.phone && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("date", { required: true }) }}
                                                className={'sm:col-span-3'} title={'Birth Date'} inputType={'date'}>
                                                {errors.date && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("country", { required: true }) }}
                                                className={'sm:col-span-3'} title={'Country'} >
                                                {errors.country && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("address", { required: true }) }}
                                                className={'sm:col-span-3'} title={'Street address'}>
                                                {errors.address && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("city", { required: true }) }}
                                                className={'sm:col-span-3'} title={'City'}  >
                                                {errors.city && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("region", { required: true }) }}
                                                className={'sm:col-span-3'} title={'State / Province'}>
                                                {errors.region && <span>This field is required</span>}
                                            </AppInput>

                                            <AppInput
                                                registerProps={{ ...register("code", { required: true }) }}
                                                className={'sm:col-span-3'} title={'ZIP / Postal code'} >
                                                {errors.code && <span>This field is required</span>}
                                            </AppInput>
                                            {/* END:- Here we are using AppInput and in this we are passing title, validation and classes */}

                                        </div>
                                    </div>
                                </div>
                                <div className="px-5">
                                    <div className="mt-4">
                                        <AppInput
                                            registerProps={{ ...register("title", { required: true }) }}
                                            title={'Company Role'}>
                                            {errors.title && <span>This field is required</span>}
                                        </AppInput>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        {/* START:- Here we are using AppTextarea and in this we are passing title, validation and classes */}
                                        <AppTextarea
                                            registerProps={{ ...register("about", { required: true }) }}
                                            title={'About'} className="sm:col-span-6">
                                            {errors.about && <span>This field is required</span>}
                                            <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                                        </AppTextarea>


                                        <div className="sm:col-span-6">

                                            <Label title={' Profile Photo'} />
                                            <div className="mt-1 flex items-center">
                                                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                    {profile.imageUrl
                                                        ?
                                                        <img src={profile.imageUrl} alt='profile-img' /> :
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>}
                                                </span>
                                            </div>

                                            {/* Here we are using loader to wait for our image upload*/}
                                            {isUpload ? <Spinner /> : ''}
                                        </div>

                                        <div className="sm:col-span-6">
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only"
                                                                onChange={(event) => { handleFileUpload(event.target.files[0]) }} />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 px-5">
                                    <Heading title={'Work Experience'} />
                                    <AddInputFields form={handleWorkExperience} buttonText={'Add Work'} name={'Company Name'}
                                        selectedFields={profile.workExperience} />
                                    {workValidation ? <div className="text-red-400 font-semibold text-sm">Fields Required</div> : ''}
                                </div>

                                <div className="pt-8 px-5">
                                    <Heading title={'Education'} />
                                    <AddInputFields form={handleEducation} buttonText={'Add Education'} name={'School Name'}
                                        selectedFields={profile.education} />
                                    {educationValidation ? <div className="text-red-400 font-semibold text-sm">Fields Required</div> : ''}
                                </div>

                                <div className="pt-8 px-5">

                                    <Heading title={'Additional Url'} />
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <AppInput
                                            registerProps={{ ...register("linkedinUrl") }}
                                            className={'sm:col-span-2'} title={'Linkedin Url'}>
                                        </AppInput>

                                        <AppInput
                                            registerProps={{ ...register("githubUrl") }}
                                            className={'sm:col-span-2'} title={'Github Url'}>
                                        </AppInput>

                                        <AppInput
                                            registerProps={{ ...register("portfolioUrl") }}
                                            className={'sm:col-span-2'} title={'Portfolio Url'}>
                                        </AppInput>

                                    </div>
                                </div>
                                <div className="pt-8 px-5">
                                    <Heading title={'Interest and Skills'} />
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <MultipleSelectChip options={skillsOptions} onSelect={(e) => setSkills(e)} selectedValue={skills}
                                                label={'Select Skills'} />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <MultipleSelectChip options={hobbiesOptions} onSelect={(e) => setHobbies(e)} selectedValue={hobbies}
                                                label={'Select Hobbies'} />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <MultipleSelectChip options={languagesOptions} onSelect={(e) => setLanguages(e)} selectedValue={languages}
                                                label={'Select Languages'} />
                                        </div>
                                        <div className="sm:col-span-6">
                                            <MultipleSelectChip options={activityOptions} onSelect={(e) => setActivity(e)} selectedValue={activity}
                                                label={'Certification'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Snackbars ref={snackbarRef} />
                            <div className="pt-5 px-5">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={handleSubmit} >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </>
                        : ''}
                </form>
            }
        </>
    )
}
