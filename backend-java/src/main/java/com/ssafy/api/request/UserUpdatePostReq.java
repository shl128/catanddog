
package com.ssafy.api.request;

        import io.swagger.annotations.ApiModel;
        import io.swagger.annotations.ApiModelProperty;
        import lombok.Getter;
        import lombok.Setter;

/**
 * 회원 정보 수정 API ([PATCH] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdatePostRequest")
public class UserUpdatePostReq {
    String userPhone;
    Integer userKind;
    String userNickname;
    Integer userGrade;
    Boolean userActive;

    @Override
    public String toString() {
        return "UserUpdatePostReq{" +
                "userPhone='" + userPhone + '\'' +
                ", userKind='" + userKind + '\'' +
                ", userNickname='" + userNickname + '\'' +
                ", userGrade='" + userGrade + '\'' +
                ", userActive='" + userActive + '\'' +
                '}';
    }
}
