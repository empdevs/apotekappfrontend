export default class Uri {

    public static get rootUri(){

        return process.env.REACT_APP_ROOT_URI;

    }

    public static get hostUri(){

        return process.env.REACT_APP_HOST_URI;

    }

}