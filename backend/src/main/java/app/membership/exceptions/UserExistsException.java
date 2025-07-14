package app.membership.exceptions;

public class UserExistsException extends RuntimeException {
    public UserExistsException(String message){
        super(message);
    }
}
