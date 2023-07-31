import { User } from './entities';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private logger;
    private userRepository;
    private roleRepository;
    private permissionRepository;
    private redisService;
    initData(): Promise<void>;
    register(user: RegisterUserDto): Promise<"注册成功" | "注册失败">;
    login(loginUserDto: LoginUserDto, isAdmin: boolean): Promise<LoginUserVo>;
    findUserById(userId: number, isAdmin: boolean): Promise<{
        id: number;
        username: string;
        isAdmin: boolean;
        roles: string[];
        permissions: any[];
    }>;
    findUserDetailById(userId: any): Promise<User>;
    updatePassword(userId: number, passwordDto: UpdateUserPasswordDto): Promise<string>;
    update(userId: number, updateUserDto: UpdateUserDto): Promise<string>;
}
