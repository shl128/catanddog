package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 846542477L;

    public static final QUser user = new QUser("user");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> userid = _super.userid;

    public final StringPath user_email = createString("user_email");

    public final StringPath user_nickname = createString("user_nickname");

    public final StringPath user_password = createString("user_password");

    public final StringPath user_kind = createString("user_kind");

    public final NumberPath user_phone = createNumber("user_phone");

    public final NumberPath user_kind = createNumber("user_kind");

    public final NumberPath user_grade = createNumber("user_grade");

    public final BooleanPath user_active = createNumber("user_active");

    public final NumberPath user_regdate = createNumber("user_regdate");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

